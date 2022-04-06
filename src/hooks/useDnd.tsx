import React, { useRef, useState } from "react";

interface Arg {
  name: string;
}

interface Position {
  x: number;
  y: number;
}

interface Item<T> {
  data: T;
  key: string;
  position: Position;
  el: HTMLDivElement;
}

interface Ref<T> {
  keys: Map<T, string>;
  items: Item<T>[];
  hover: boolean;
  position: Position;
  target: Item<T> | null;
}

interface Data<T> {
  key: string;
  data: T;
  events: {
    ref: (el: HTMLDivElement | null) => void;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
}

export const useDnD = <T extends Arg | string>(
  arg: T[]
): [data: Data<T>[], map: string[]] => {
  const [items, setItems] = useState(arg);

  const ref = useRef<Ref<T>>({
    items: [],
    keys: new Map(),
    target: null,
    hover: true,
    position: { x: 0, y: 0 },
  }).current;

  const isHover = (ev: MouseEvent, el: HTMLDivElement): boolean => {
    const clientX = ev.clientX;
    const clientY = ev.clientY;

    const rect = el.getBoundingClientRect();

    return (
      clientY < rect.bottom &&
      clientY > rect.top &&
      clientX < rect.right &&
      clientX > rect.left
    );
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!ref.target) return;

    const x = e.clientX - ref.position.x;
    const y = e.clientY - ref.position.y;

    const style = ref.target.el.style;

    style.zIndex = "100";
    style.cursor = "grabbing";
    style.transform = `translate( ${x}px, ${y}px )`;

    if (!ref.hover) return;

    ref.hover = false;

    setTimeout(() => (ref.hover = true), 300);

    const drag = ref.items.findIndex(({ key }) => key === ref.target?.key);

    const hover = ref.items.findIndex(
      ({ el }, i) => i !== drag && isHover(e, el)
    );

    if (hover !== -1) {
      ref.position.x = e.clientX;
      ref.position.y = e.clientY;

      ref.items.splice(drag, 1);
      ref.items.splice(hover, 0, ref.target);

      const { left: x, top: y } = ref.target.el.getBoundingClientRect();

      ref.target.position = { x, y };

      setItems(ref.items.map((item) => item.data));
    }
  };

  const onMouseUp = () => {
    if (!ref.target) return;

    const style = ref.target.el.style;

    style.zIndex = "";
    style.cursor = "";
    style.transform = "";

    ref.target = null;

    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  const createEvents = (key: string, data: T) => ({
    ref: (el: HTMLDivElement | null) => {
      if (!el) return;

      el.style.transform = "";

      const { left: x, top: y } = el.getBoundingClientRect();
      const position: Position = { x, y };

      const i = ref.items.findIndex((item) => item.key === key);

      if (i === -1) {
        return ref.items.push({ key, data, el, position });
      }

      if (ref.target?.key === key) {
        const x = ref.target.position.x - position.x;
        const y = ref.target.position.y - position.y;

        el.style.transform = `translate( ${x}px, ${y}px )`;

        ref.position.x -= x;
        ref.position.y -= y;
      }

      if (ref.target?.key !== key) {
        const item = ref.items[i];

        const x = item.position.x - position.x;
        const y = item.position.y - position.y;

        el.style.transition = "";
        el.style.transform = `translate( ${x}px, ${y}px )`;

        requestAnimationFrame(() => {
          el.style.transform = "";
          el.style.transition = "all .4s";
        });
      }

      ref.items[i] = { key, data, el, position };
    },

    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;

      ref.position.x = e.clientX;
      ref.position.y = e.clientY;

      el.style.transition = "";
      el.style.cursor = "grabbing";

      const { left: x, top: y } = el.getBoundingClientRect();
      const position: Position = { x, y };

      ref.target = { key, data, el, position };

      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
    },
  });

  const data = items.map((data: T): Data<T> => {
    const key = typeof data !== "string" ? data.name : data;

    ref.keys.set(data, key);

    return {
      data,
      key,
      events: createEvents(key, data),
    };
  });

  const map = ref.items.map((item) => item.key);

  return [data, map];
};
