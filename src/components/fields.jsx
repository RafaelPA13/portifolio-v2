export default function Fields({ type, placeholder, textarea = false, className, value, onChange }) {
  return (
    <>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bg-slate-100 px-3 py-2 border border-slate-300 rounded-lg ${className}`}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bg-slate-100 px-3 py-2 border border-slate-300 rounded-lg ${className}`}
        />
      )}
    </>
  );
}
