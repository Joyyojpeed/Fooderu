export default function MenuItem() {
  return (
    <div
      className="bg-gray-200 p-4 rounded-lg text-center group 
    hover:bg-white hover:shadow-md 
    hover:shadow-black/25 transition-all"
    >
        <div className="text-center ">
        <img src="/Food-PNG.png" className="max-h-auto max-h-32
        block mx-auto"
         alt="food" />
        </div>
      

      <h4 className="font-semibold my-3 text-xl">food1</h4>
      <p className="text-gray-500 text-sm">
        lorem ipsum dipsum dolor sit amet khub bhalo khabar
      </p>
      <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
        Add to cart Rs.350
      </button>
    </div>
  );
}
