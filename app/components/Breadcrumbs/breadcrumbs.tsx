"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/app/components/ui/breadcrumb";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  data: {
    name: string;
    url: string;
  }[];
};

const BreadcrumbNav = ({
  separator,
  containerClasses,
  data,
}: TBreadCrumbProps) => {
  //   const paths = usePathname();
  //   const pathNames = paths.split("/").filter((path) => path);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-6xl w-full">
        <ul className={containerClasses}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              {data.length > 0 && separator}
              {data.map((link, index) => {
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={link.url}>
                        {link.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    {data.length !== index + 1 && separator}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </ul>
      </div>
    </div>
  );
};

export default BreadcrumbNav;
