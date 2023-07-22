import dynamic from "next/dynamic";

export const NoSSR = dynamic(() => Promise.resolve((props: any) => (props)), { ssr: false });