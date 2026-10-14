export type ServiceLeaf = {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
};

export type ServiceCategory = {
  readonly slug: string;
  readonly title: string;
  readonly lede: string;
  readonly leaves: readonly ServiceLeaf[];
};

export type NavItem = { readonly label: string; readonly href: string };
