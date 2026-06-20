export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    // Changed text-gray-700 to text-gray-300
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-1">
      {children}
    </label>
  );
}