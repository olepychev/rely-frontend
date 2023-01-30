import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { showLoading, hideLoading } from "../../lib/uiService";

const DocUpload = () => {
    let navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const [docs, setDocs] = useState(null);
    const [message, setMessage] = useState("");
    const onChangeDocs = (e) => {
        const docs = e.target.files[0];
        setDocs(docs);
    };
    const handleUpload = async (e) => {
        e.preventDefault();
        setMessage("");
        let data = new FormData();
        data.append('docs', docs);
        showLoading();
        UserService.upload_docs(currentUser.id, data).then(
            () => {
                hideLoading();
                navigate("/success");
                window.location.reload();
            },
            (error) => {
                hideLoading();
                const resMessage =
                    (error.response &&
                        error.response.data) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        );
    };
    return (
        <div className="container max-w-none">
            <div className="grid grid-cols-12 gap-2 login-grid">
                <div className="col-span-6 image"></div>
                <div className="col-span-6 form">
                    <div>
                        <h2 className="mb-5 !text-black !font-bold">Step 2</h2>
                        <h1>Upload docs</h1>
                        <h2 className="mb-5">Comencemos!</h2>
                        <div className="KYC-box">
                            <div>
                                <input
                                    type="file"
                                    className="docs"
                                    accept=".doc, .docs, .pdf"
                                    onChange={onChangeDocs}
                                />
                                <p>Documents</p>
                            </div>
                        </div>
                        <button className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400" disabled={!docs} onClick={handleUpload}>
                            Enviar
                        </button>
                        {message && (
                            <div className="form-group">
                                <div
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DocUpload;
