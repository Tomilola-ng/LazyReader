export default function Gap({ height = 10 }: { height?: number }) {
  return <div className={`w-full h-${height}`} />;
}
