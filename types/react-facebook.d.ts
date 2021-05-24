declare module "react-facebook" {
  export class FacebookProvider extends React.Component<{ appId: string }> {}

  export class Like extends React.PureComponent<
    { href: string; width: number; size?: "small" | "large" },
    any
  > {}
}
