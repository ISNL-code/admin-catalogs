import { Box, Typography } from '@mui/material';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';
import MainHeaderLogo from 'components/atoms/Logo/MainHeaderLogo';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const info_text = `1. GENERAL PROVISIONS\n
- 1.1. User's use of the site constitutes agreement with this Privacy Policy and the terms of the user's personal data processing.\n
- 1.2. In case of disagreement with the terms of the Privacy Policy, the user must stop using the site.\n
- 1.3. This Privacy Policy applies only to this site. The site administration does not control and is not responsible for third-party websites that the user may access through links available on the site.\n
- 1.4. The site administration does not verify the accuracy of personal data provided by the user.\n
\n
2. PRIVACY POLICY SUBJECT\n
- 2.1. This Privacy Policy establishes the obligations of the site administration to not disclose and to protect the privacy of personal data that the user provides at the request of the site administration.\n
- 2.2. Personal data permitted for processing under this Privacy Policy are provided by the user by filling out the registration form on the site.\n
\n
3. PURPOSES OF COLLECTING USER PERSONAL INFORMATION\n
- 3.1. The site administration may use the user's personal data for the purposes of:\n
- 3.1.1. Identifying the user to process an order.\n
- 3.1.2. Providing the user with access to personalized site resources.\n
- 3.1.3. Establishing contact with the user, including sending notifications, inquiries concerning the use of the site, provision of services, and processing user requests and applications.\n
- 3.1.4. Determining the user's location to ensure security and prevent fraud.\n
- 3.1.5. Confirming the accuracy and completeness of personal data provided by the user.\n
- 3.1.6. Informing the user of the site about the status of the order.\n
- 3.1.7. Providing effective customer and technical support in case of problems related to the use of the site.\n
- 3.1.8. Providing the user, with their consent, updates on products, special offers, pricing information, newsletters, and other information on behalf of the site or its partners.\n
- 3.1.9. Conducting advertising activities with the consent of the user.\n
- 3.1.10. Providing the user access to partner sites or services to obtain products, updates, and services.\n
\n
4. PARTIES' OBLIGATIONS\n
- 4.1. The user is obligated to:\n
- 4.1.1. Provide personal data necessary for using the site.\n
- 4.1.2. Update and supplement the provided personal data information in case of any changes.\n
- 4.2. The site administration is obligated to:\n
- 4.2.1. Use the information obtained exclusively for the purposes specified in clause 3 of this Privacy Policy.\n
- 4.2.2. Keep the confidential information secret, not disclose it without the user's prior written consent, and not sell, exchange, publish, or disclose the user's personal data by any other means.\n
- 4.2.3. Take precautions to protect the confidentiality of the user's personal data according to the procedure normally used to protect such information in existing business transactions.\n
- 4.2.4. Block personal data relating to the respective user from the moment the user or their legal representative or an authorized body for the protection of personal data subjects makes a request or inquiry, during the period of verification, in case of inaccurate personal data or unlawful actions.\n
\n
5. PARTIES' LIABILITY\n
- 5.1. The site administration, having failed to fulfill its obligations, is liable for losses incurred by the user due to the unlawful use of personal data, in accordance with the laws of Ukraine.\n
- 5.2. In the event of loss or disclosure of Confidential Information, the site administration is not responsible if such confidential information:\n
- 5.2.1. Became public domain before its loss or disclosure.\n
- 5.2.2. Was received from a third party before it was obtained by the site administration.\n
- 5.2.3. Was disclosed with the consent of the user.\n
\n
6. DISPUTE RESOLUTION\n
- 6.1. Before filing a lawsuit with disputes arising from the relations between the site user and the site administration, it is mandatory to submit a claim (a written proposal for voluntary dispute resolution).\n
- 6.2. The recipient of the claim must notify the claimant in writing of the results of the claim consideration within 30 calendar days from the day of receiving the claim.\n
- 6.3. If an agreement is not reached, the dispute will be referred to a judicial body in accordance with the current legislation of Ukraine.\n
\n
7. ADDITIONAL TERMS\n
- 7.1. The site administration has the right to make changes to this Privacy Policy without the user's consent.\n
- 7.2. The new Privacy Policy comes into effect from the moment it is posted on the e-commerce site, unless otherwise provided by the new edition of the Policy.`;

const PolicyPage = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Box
                px={4}
                sx={{
                    height: 50,
                    borderBottom: '1px solid #ccc',
                    position: 'fixed',
                    width: '100%',
                    left: 0,
                    top: 0,
                    zIndex: 4000,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MainHeaderLogo />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 150 }}>
                        <HeaderNavButton
                            title={'login'}
                            icon={props => <LogoutIcon {...props} />}
                            action={() => navigate('/')}
                        />
                    </Box>
                </Box>
            </Box>
            <Box px={4} py={2}>
                <Typography variant="h2" sx={{ color: '#313131', my: 6 }}>
                    Sales Nest Privacy Policy
                </Typography>
                <Typography
                    sx={{ color: '#313131' }}
                    dangerouslySetInnerHTML={{ __html: info_text?.replace(/\n/g, '<br />') }}
                />
            </Box>
        </Box>
    );
};

export default PolicyPage;
