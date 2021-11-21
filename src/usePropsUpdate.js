import { useEffect, useRef } from "react";

export const usePropsUpdate = (props) => {
  const prev = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});

    prev.current = props;

    if (!Object.keys(changedProps).length) {
      return;
    }

    for (const [key, values] of Object.entries(changedProps)) {
      console.log(key, "previous", values[0], "current", values[1]);
    }

    /*
    _(
      filter((e) => typeof e[0] !== "function"),
      tap(console.log)
    )(changedProps);
    */
  });
};
