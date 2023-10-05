import React from "react";
import { Popover } from "@nextui-org/react";

interface HoverPopover {
    children: React.ReactNode[];
}
const PopoverWrapper = ({ children }: HoverPopover) => {
    const [open, setOpen] = React.useState(false);

    // find PopoverTrigger and PopoverContent children
    const trigger = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).type === PopoverTrigger
    );
    const content = React.Children.toArray(children).find(
        (child) => (child as React.ReactElement).type === PopoverContent
    );

    return (
        <>
            <Popover isOpen={open}>
                <PopoverTrigger>
                    <div
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        onClick={(e) => {
                            // check if its a tap or a click
                            if (e.detail === 0) {
                                setOpen(!open);
                            }
                        }}
                    >
                        {trigger}
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    {content}
                </PopoverContent>
            </Popover>
        </>
    );
};

// PopoverTrigger component
export const PopoverTrigger = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
);

// PopoverContent component
export const PopoverContent = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
);

export default PopoverWrapper;