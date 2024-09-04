import clsx from 'clsx'
import ICON_LOADING from '../assets/imgs/icon_loading.png'

export default function({ loading, text = '', className = '', onClick = () => {}, loadingClass = '' }) {
    return (
        /*<div className={clsx('w-full h-[54px] bg-Orange rounded-[8px] mt-[14px] text-White text-h6 font-semibold flex justify-center items-center active:opacity-70', className, {'opacity-70': loading})} onClick={onClick}>
            <span>{text}</span>
            {loading && <img className={clsx('loading-rotate-1s w-[18px] h-[18px] absolute right-[40px]', loadingClass)} width={18} height={18} src={ICON_LOADING} />}
        </div>*/
        <div className={clsx('w-full h-[54px] bg-Orange rounded-[8px] mt-[14px] text-White text-h6 font-semibold flex justify-center items-center active:opacity-70', className, {'opacity-70': false})} onClick={onClick}>
            <span>{text}</span>
            {false && <img className={clsx('loading-rotate-1s w-[18px] h-[18px] absolute right-[40px]', loadingClass)} width={18} height={18} src={ICON_LOADING} />}
        </div>
    )
}
