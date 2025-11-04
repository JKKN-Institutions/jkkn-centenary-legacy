const ShimmerLoader = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-muted">
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--muted-foreground) / 0.1) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
};

export default ShimmerLoader;
