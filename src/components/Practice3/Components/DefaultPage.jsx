import react from "../../../assets/react.svg"

export const DefaultPage = () => {
    return (
        <div className="default-page-main">
            <div className="react-symbol-container">
                <img className="react-symbol-img rotate" src={react} alt="React" />
            </div>
        </div>
    );
}