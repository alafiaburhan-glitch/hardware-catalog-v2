import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lbbmvabcirbkzagrdmwj.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/products/emery-roll-36grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-40grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-50grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-60grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-80grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-100grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-120grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-150grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-180grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-220grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-320grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-400grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      {
        source: "/products/emery-roll-600grit",
        destination: "/products/emery-roll",
        permanent: true,
      },
      ...[
        "36", "40", "50", "60", "80", "100", "120",
        "150", "180", "220", "320", "400", "600",
      ].map((grit) => ({
        source: `/products/emery-roll-${grit}-grit`,
        destination: "/products/emery-roll",
        permanent: true,
      })),
      {
        source: "/products/cer_blnk",
        destination: "/products/ceramic-blanket",
        permanent: true,
      },
      {
        source: "/products/construction-hose",
        destination: "/products/construction-braided-hose",
        permanent: true,
      },
      {
        source: "/products/duct-hose",
        destination: "/products/pvc-duct-hose",
        permanent: true,
      },
      {
        source: "/products/suction-hose",
        destination: "/products/pvc-suction-hose",
        permanent: true,
      },
      {
        source: "/products/welding-hose",
        destination: "/products/tpr-welding-hose",
        permanent: true,
      },
      {
        source: "/products/ladder_4_steps",
        destination: "/products/aluminium-ladder-4-step",
        permanent: true,
      },
      {
        source: "/products/ladder_5_steps",
        destination: "/products/aluminium-ladder-5-step",
        permanent: true,
      },
      {
        source: "/products/ladder_6_steps",
        destination: "/products/aluminium-ladder-6-step",
        permanent: true,
      },
      {
        source: "/products/ladder_7_steps",
        destination: "/products/aluminium-ladder-7-step",
        permanent: true,
      },
      {
        source: "/products/telescopic-ladder-12steps",
        destination: "/products/telescopic-ladder-12-step",
        permanent: true,
      },
      {
        source: "/products/telescopic-ladder-15steps",
        destination: "/products/telescopic-ladder-15-step",
        permanent: true,
      },
      {
        source: "/products/anti-abbrasive-sleeve",
        destination: "/products/anti-abrasive-sleeve",
        permanent: true,
      },
      {
        source: "/products/rachet-lash",
        destination: "/products/ratchet-lash",
        permanent: true,
      },
      {
        source: "/products/net-fence",
        destination: "/products/fence-net",
        permanent: true,
      },
      {
        source: "/products/net-shade",
        destination: "/products/shade-net",
        permanent: true,
      },
      {
        source: "/products/foam-tape",
        destination: "/products/acrylic-foam-tape",
        permanent: true,
      },
      {
        source: "/products/foil-tape",
        destination: "/products/aluminium-foil-tape",
        permanent: true,
      },
      {
        source: "/products/antiskid-tape",
        destination: "/products/anti-skid-tape",
        permanent: true,
      },
      {
        source: "/products/poly-tape",
        destination: "/products/double-side-polyester-tape",
        permanent: true,
      },
      {
        source: "/products/mesh-tape",
        destination: "/products/fiber-mesh-tape",
        permanent: true,
      },
      {
        source: "/products/marking-tape",
        destination: "/products/floor-marking-tape",
        permanent: true,
      },
      {
        source: "/products/protection-tape",
        destination: "/products/floor-protection-tape",
        permanent: true,
      },
      {
        source: "/products/ins-tape",
        destination: "/products/insulation-tape",
        permanent: true,
      },
      {
        source: "/products/mask-tape",
        destination: "/products/masking-tape",
        permanent: true,
      },
      {
        source: "/products/ref-tape",
        destination: "/products/reflective-tape",
        permanent: true,
      },
      {
        source: "/products/1side-foam-tape",
        destination: "/products/single-side-foam-tape",
        permanent: true,
      },
      {
        source: "/products/tef-tape",
        destination: "/products/teflon-tape",
        permanent: true,
      },
      {
        source: "/products/tarp-hdpe",
        destination: "/products/hdpe-tarpaulin",
        permanent: true,
      },
      {
        source: "/products/tarp-nylon",
        destination: "/products/pvc-nylon-tarpaulin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
