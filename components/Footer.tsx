export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-red-800 to-red-700 px-6 py-5 text-center text-sm text-red-100">
      <p>
        &copy; {currentYear} Noor Agencies. All rights reserved.
      </p>
    </footer>
  );
}
