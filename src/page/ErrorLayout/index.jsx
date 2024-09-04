import { useNavigate, useSearchParams } from 'react-router-dom'
import { IconErrorPlace } from '../../components/Iconfont'

export const ErrorLayout = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    return (
        <div className="w-full h-full px-[16px] bg-bg_bottom">
            <div className="pt-[160px] pb-[34px] flex flex-col items-center justify-center px-4 text-center">
                <IconErrorPlace className="text-text_1 text-[40px]" />
                <h1 className=" mb-[4px] text-h3 text-text_1 font-Semibold flex items-center  py-2 ">
                    Error
                </h1>
                <p className=" text-body4 text-text_2 pb-5">
                    Error Desc
                </p>
                <div className="px-[16px] fixed bottom-[20px] w-full">
                    <div
                        className='rounded-[12px] flex justify-center items-center text-body1 font-Semibold bg-bg_0 text-text_1 w-full h-[52px]'
                        onClick={() => navigate('/', { replace: true })}
                    >
                        Back to home
                    </div>
                </div>
            </div>
        </div>
    )
}
