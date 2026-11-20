"use client";

import { useEffect, useState } from "react";

export function VisitorCounter({
  className = "font-medium text-[#64748B]",
}: {
  className?: string;
}) {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const namespace = process.env.NEXT_PUBLIC_COUNTER_NAMESPACE;
    const key = process.env.NEXT_PUBLIC_COUNTER_KEY;
    if (!namespace || !key) return;

    const hasVisited = sessionStorage.getItem("rq_has_visited");
    const path = hasVisited ? "/" : "/up";

    fetch(`https://api.counterapi.dev/v1/${namespace}/${key}${path}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (typeof data?.count !== "number") return;
        setVisitorCount(data.count);
        if (!hasVisited) sessionStorage.setItem("rq_has_visited", "true");
      })
      .catch(() => {
        // The optional counter must not affect the rest of the page.
      });
  }, []);

  return (
    <span className={`font-bold ${className}`}>
      {visitorCount === null ? "" : `${visitorCount} زيارة`}
    </span>
  );
}
