import React from "react";
import * as Icons from "react-icons/vsc";

export default function SidebarLink({subLink, iconName}) {

    const Icon = Icons[iconName];

    return(
        <div className="flex gap-x-2 h-[38px] items-center pl-7">
            <p>{subLink.name}</p>
            <Icon className="text-lg"/>
        </div>
    )
}