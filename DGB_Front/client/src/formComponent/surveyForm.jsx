/* eslint-disable */

export default function Question({ Q, Quest, name, SurveyList, Options, handle }) {
    return (
        <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
            <h3>{Q}</h3>
            <p>{Quest}</p>
            <div className={`grid gap-3 grid-rows-${SurveyList.length} w-full`} >
                {SurveyList && SurveyList.map((text, index) => {
                    return (
                        <ui><input
                            type="radio"
                            name={String(name + 1)}
                            value={index}
                            defaultChecked={index === 0}
                            checked={Options[0] === String(index)}
                            onChange={(event) => handle(name, event)}
                        />
                            {text}
                        </ui>
                    )
                })}
            </div>
        </div>
    )
}