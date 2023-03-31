declare module '*.svg' {
  const svgContent: React.FunctionComponent<
    React.PropsWithChildren<React.SVGAttributes<SVGElement>>
  >
  export default svgContent
}
