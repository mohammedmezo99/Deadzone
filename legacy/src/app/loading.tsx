export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse" />
        <div className="w-32 h-4 rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}
