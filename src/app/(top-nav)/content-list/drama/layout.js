export default function DramaLayout({ modal, children }) {
  console.log("🧪 drama layout mounted");

  return (
    <>
      {children}
      {modal}
    </>
  );
}
