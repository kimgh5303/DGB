import Modal from 'react-modal'
import loading from "../imgfile/loading.gif"
import loading2 from "../imgfile/loading2.gif"
import { GifComponent } from "../gifcomponent";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    }
};

export default function CustomModal({ openHandle, closeFunc, Text, children, type=0 }) {
    return (
        <Modal
            isOpen={openHandle}
            onRequestClose={() => closeFunc(prevState => ({ ...prevState, ModalOpen: false }))}
            shouldCloseOnOverlayClick={false}
            style={customStyles}>
            <h3 className='w-full h-auto text-center' style={{ whiteSpace: 'pre-wrap' }}>{Text}</h3>
            <GifComponent className="block m-auto text-center" gif={type === 1 ? loading: loading2} />
            {children}
        </Modal>
    )
}