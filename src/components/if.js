import { ReactNode } from "react";

export default function If(props) {
    if (props.condition)
        return props.children;
    return <></>;
}