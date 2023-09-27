/* eslint-disable */
export function ScrollRemote() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    return (
        <div className="fixed z-10 right-5 top-1/2 p-4 rounded-4 border-solid border-2 grid grid-row-2 border-indigo-400">
            <button className="relative z-5 inline-flex items-center justify-center rounded-3 bg-indigo-400 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-3" onClick={scrollToTop}>↑위로↑</button>
            <button className="relative z-5 inline-flex items-center justify-center rounded-3 bg-indigo-400 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-3" onClick={scrollToBottom}>↓아래로↓</button>
        </div>
    );
}
