/**
 * Ultra-subtle vertical curve — suggests flow down the page without reading as decoration.
 * Halo path + soft blur reads as depth; mask ties it into section transitions.
 */
export function HomePageFlowSpine() {
  const pathD =
    "M58 24 C40 130 82 238 50 352 C36 432 74 518 46 598 C32 678 70 758 48 838 C42 872 52 898 58 912";

  return (
    <div className="home-page-flow-spine hidden lg:block" aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 120 920"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="rr-flow-spine-blur" x="-30%" y="-10%" width="160%" height="120%">
            <feGaussianBlur stdDeviation="1.35" />
          </filter>
        </defs>
        <path d={pathD} className="home-page-flow-spine-halo" />
        <path d={pathD} className="home-page-flow-spine-path" />
      </svg>
    </div>
  );
}
