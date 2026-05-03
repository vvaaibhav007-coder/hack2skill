/// <reference types="vite/client" />

declare module "*.jsx" {
  import { FC, ReactNode } from "react"
  const component: FC<{ children?: ReactNode; className?: string }>
  export default component
}