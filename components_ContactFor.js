import { useState } from 'react';

export default function ContactForm() {
  const [state, setState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });
    if (res.ok) {
      setStatus('success');
      setState({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 max-w-xl">
      <label className="block">
        <span className="text-sm">Name</span>
        <input required value={state.name} onChange={(e)=>setState({...state,name:e.target.value})} className="mt-1 block w-full rounded border px-3 py-2" />
      </label>
      <label className="block mt-3">
        <span className="text-sm">Email</span>
        <input type="email" required value={state.email} onChange={(e)=>setState({...state,email:e.target.value})} className="mt-1 block w-full rounded border px-3 py-2" />
      </label>
      <label className="block mt-3">
        <span className="text-sm">Message</span>
        <textarea required value={state.message} onChange={(e)=>setState({...state,message:e.target.value})} className="mt-1 block w-full rounded border px-3 py-2" rows="5" />
      </label>
      <div className="mt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
        {status === 'loading' && <span className="ml-3">Sending…</span>}
        {status === 'success' && <span className="ml-3 text-green-600">Message sent!</span>}
        {status === 'error' && <span className="ml-3 text-red-600">Error sending message.</span>}
      </div>
    </form>
  );
}
