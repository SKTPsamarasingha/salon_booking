const PrimaryBtn = ({text,fn}) => {
    return (<button onClick={fn}   className={`rounded bg-black text-white w-fit  px-3 h-[2.5rem] cursor-pointer`}>{text}</button>)
}
export default PrimaryBtn
