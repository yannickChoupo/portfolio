import React from "react";


interface PrivacyProps {
    onAccept: () => void;
    onReject: () => void;
    onClose?: () => void;
}


const Privacy: React.FC<PrivacyProps> = ({ onAccept, onReject }) => {
    return (
        <div className="privacy-overlay">
            <div className="privacy-popup">
                <div className="privacy-page">
                    <div className="privacy-settings">
                        <h1>Privacy Policy</h1>
                        <div
                            className="privacy-settings-button">
                            Privacy settings
                        </div>
                    </div>
                    <p>
                        Last updated: 19 August 2026
                    </p>
                    <h2>1. Controller</h2>
                    <p>
                        The controller responsible for processing personal
                        data on this website is:
                    </p>

                    <p>
                        Yannick Njilo
                        <br />
                        Germany
                        <br />
                        Email: yannicknjilo@gmail.com
                    </p>
                    <h2>2. What data we process</h2>
                    <p>
                        When you visit this website, technical information
                        may be processed in order to operate the website
                        and measure visits. Depending on your consent,
                        this may include:
                    </p>
                    <ul>
                        <li>a randomly generated visitor ID</li>
                        <li>the time of the first visit</li>
                        <li>the time of the most recent visit</li>
                        <li>the number of visits</li>
                    </ul>
                    <p>
                        The visitor ID is randomly generated and does not
                        directly identify you by name.
                    </p>
                    <h2>3. Visitor cookie</h2>
                    <p>
                        With your consent, this website stores a small
                        cookie called <code>visitorId</code>. The cookie
                        is used to recognize returning visitors and
                        calculate visitor statistics.
                    </p>
                    <p>
                        The cookie is configured as an HttpOnly cookie,
                        which means that it cannot be accessed by
                        JavaScript running in your browser.
                    </p>
                    <h2>4. Purpose of processing</h2>
                    <p>
                        Visitor information is processed to understand
                        how frequently the portfolio website is visited
                        and to maintain basic visitor statistics.
                    </p>
                    <h2>5. Legal basis</h2>
                    <p>
                        Where consent is required, visitor tracking is
                        performed only after you have given your consent.
                        You may withdraw your consent at any time by
                        deleting your site data or changing your privacy
                        preferences.
                    </p>
                    <h2>6. Data storage</h2>
                    <p>
                        Visitor information is stored in a MongoDB
                        database used by this website.
                    </p>
                    <p>
                        We retain visitor information only for as long
                        as necessary for the purposes described above
                        or as required by applicable law.
                    </p>
                    <h2>7. Data sharing</h2>
                    <p>
                        Personal data is not sold or used for advertising.
                        Data may be processed by technical service
                        providers required to operate the website and
                        database infrastructure.
                    </p>
                    <h2>8. Your rights</h2>
                    <p>
                        Under applicable data protection law, including
                        the GDPR, you may have the right to:
                    </p>
                    <ul>
                        <li>request access to your personal data</li>
                        <li>request correction of inaccurate data</li>
                        <li>request deletion of your data</li>
                        <li>request restriction of processing</li>
                        <li>object to certain processing</li>
                        <li>withdraw consent where processing is based on consent</li>
                        <li>lodge a complaint with a data protection authority</li>
                    </ul>
                    <h2>9. Contact</h2>
                    <p>
                        If you have questions about the processing of
                        your personal data, please contact:
                    </p>
                    <p>
                        Email: yannicknjilo@gmail.com
                    </p>
                    <h2>10. Changes to this Privacy Policy</h2>
                    <p>
                        This Privacy Policy may be updated from time to
                        time to reflect changes to the website or legal
                        requirements.
                    </p>
                    <div className="privacy-actions">
                        <button
                            type="button"
                            className="privacy-reject"
                            onClick={onReject}>
                            Reject
                        </button>

                        <button
                            type="button"
                            className="privacy-accept"
                            onClick={onAccept}>
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;