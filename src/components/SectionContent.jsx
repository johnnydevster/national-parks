export default function SectionContent({ header, image, children }) {
  return (
    <div>
      <h2 className="text-4xl mb-8">{header.title}</h2>
      {image && (
        <div className="my-8 lg:my-16">
          <img
            src={image}
            className="object-cover w-full h-full contrast-125"
          />
        </div>
      )}
      <div className="max-w-2xl mx-auto">{children}</div>
    </div>
  );
}
