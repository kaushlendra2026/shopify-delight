export const Component = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[70px] h-[70px]">
        <div className="absolute rounded-[4px] bg-primary animate-loaderAnim" style={{ inset: '0 35px 35px 0' }} />
        <div className="absolute rounded-[4px] bg-primary animate-loaderAnim animation-delay" style={{ inset: '0 35px 35px 0' }} />
      </div>
      <style>{`
        @keyframes loaderAnim {
          0% { inset: 0 35px 35px 0; }
          12.5% { inset: 0 35px 0 0; }
          25% { inset: 35px 35px 0 0; }
          37.5% { inset: 35px 0 0 0; }
          50% { inset: 35px 0 0 35px; }
          62.5% { inset: 0 0 0 35px; }
          75% { inset: 0 0 35px 35px; }
          87.5% { inset: 0 0 35px 0; }
          100% { inset: 0 35px 35px 0; }
        }
        .animate-loaderAnim {
          animation: loaderAnim 2.5s infinite;
        }
        .animation-delay {
          animation-delay: -1.25s;
        }
      `}</style>
    </div>
  );
};
