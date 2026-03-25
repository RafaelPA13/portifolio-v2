export default function Fields({ type, placeholder, textarea = false, className }) {
  return (
    <>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          className={`bg-slate-100 px-3 py-2 border-1 border-slate-300 rounded-lg ${className}`}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`bg-slate-100 px-3 py-2 border-1 border-slate-300 rounded-lg ${className}`}
        />
      )}
    </>
  );
}
