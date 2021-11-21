# react-functional-component-stop-rerender

When passing objects and functions as props to functional components in React.js, it might be necessary to use
`memo` and pass a custom function that checks for props equality. As added performance, use
`useCallback` on the parent to only recompute functions which will be used as props when their specific
dependencies change.

See [https://smalldata.tech/blog/2021/11/22/react-functional-components-stop-render](https://smalldata.tech/blog/2021/11/22/react-functional-components-stop-render) for the relevant article.
