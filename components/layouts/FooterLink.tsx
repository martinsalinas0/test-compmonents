import Link from "next/link";

declare global {
  type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
  };
}

export {};

const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
  return (
    <div className="text-center pt-4">
      <div className="text-sm text-muted-foreground">
        {text}
        {` `}
        <p>
          <Link href={href} className="hover:text-primary hover:font-semibold">
            {linkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterLink;
