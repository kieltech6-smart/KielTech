export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} KielTech — Built with accessibility & SEO in mind.
      </div>
    </footer>
  );
}