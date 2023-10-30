//import { useEffect } from "react";

import { useCallback, useEffect, useState } from "react";
import { Toggle } from "react-daisyui";
import { ComponentColor } from "react-daisyui/dist/types";

import { WebSites } from "../class";
import IsTrue from "../utils/isTrue";
import { sendMsgToAllTab } from "../utils/sendMsgToAllTab";
import { FrontConfig } from "./config";
import { Category } from "./type";

export function SwitchItem({ config, category, color }: { config: FrontConfig; category: Category; color?: ComponentColor }) {
    const [enabled, setEnabled] = useState(false);

    console.log(`Render SwitchItem with ${config.name}`);
    useEffect(() => {
        WebSites[config.id].storage.get(category).then((value) => {
            setEnabled(IsTrue(value));
        });
    }, []);

    const genericChangeHandle = useCallback(() => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setEnabled(e.target.checked);
            WebSites[config.id].storage.set(category, e.target.checked.toString());
            sendMsgToAllTab<string>("reload");
        };
    }, []);

    return (
        <p className="flex items-center justify-center">
            {/*<input type="checkbox" className="toggle toggle-info" onChange={genericChangeHandle()} checked={enabled} />*/}
            <Toggle checked={enabled} onChange={genericChangeHandle()} color={color} />
        </p>
    );
}
