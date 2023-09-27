/* eslint-disable */
import { useLogin } from "./axioses/loginAxios";

export default function Logincompany() {
    const {
        ID,
        PW,
        inputRef,
        handleInputId,
        handleInputPw,
        onClickLogin,
        Enter
    } = useLogin("/companies/login");

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    기업 로그인
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action={""} method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            이메일
                        </label>
                        <div className="mt-2">
                            <input
                                ref={inputRef}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={ID}
                                onChange={handleInputId}
                                onKeyPress={Enter}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={PW}
                                onChange={handleInputPw}
                                onKeyPress={Enter}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3" />
                        </div>
                    </div>
                    <div>
                        <button
                            type="button" onClick={onClickLogin}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            로그인 하기
                        </button>
                        <a class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2" href="/signup_company">
                            <div class="d-inline-block bi bi-download"></div>
                            회원가입
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};