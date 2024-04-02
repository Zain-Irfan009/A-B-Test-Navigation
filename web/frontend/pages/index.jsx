import {
    Card,
    Page,
    Layout,
    TextContainer,
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Image,
    Popover,
    Scrollable,
    BlockStack,
    Pagination,
    Link,
    Select,
    PageActions,
    EmptySearchResult,
    Toast,
    ActionList,
    TextField,
    Frame,
    Tooltip,
    Button,
    Tabs,
    Modal,
    Loading,
    Icon,
    Badge,
    Text,
    ChoiceList
} from "@shopify/polaris";
import {
    SearchMinor,
    ExternalMinor,
    DeleteMinor,
    HorizontalDotsMinor,
    ViewMajor
} from "@shopify/polaris-icons";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import { AppContext } from "../components/providers";
import { trophyImage } from "../assets";
import axios from "axios";
import { useAppBridge, } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import ReactSelect from 'react-select';
import {InputField} from "../components/Utils/InputField.jsx";
import {stlye} from "../components/ToggleSwitch.css";


import { ProductsCard } from "../components";
import {useNavigate,useLocation} from "react-router-dom";

export default function HomePage() {
    const  apiUrl  = 'https://phpstack-362288-4387083.cloudwaysapps.com'
    // const { user } = useAuthState();
    const navigate = useNavigate();
    const appBridge = useAppBridge();
    const [loading, setLoading] = useState(false)
    const [customersLoading, setCustomersLoading] = useState(false)
    const [selected, setSelected] = useState(0);
    const [queryValue, setQueryValue] = useState('');
    const [toggleLoadData, setToggleLoadData] = useState(true)
    const [errorToast, setErrorToast] = useState(false);
    const [sucessToast, setSucessToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('')
    const [storeUrl, setStoreUrl] = useState('')
    const [active, setActive] = useState(false);




    const [navigation1, setNavigation1] = useState("");
    const [navigation2, setNavigation2] = useState("");


    const [audienceSize, setAudienceSize] = useState("0");



    const handleAudienceSizeStatusChange = (selectedOption) => {


        setAudienceSize(selectedOption);
    };



    const [uniqueId, setUniqueId] = useState()




    const getData = async () => {
        const sessionToken = await getSessionToken(appBridge);


        try {

            const response = await axios.get(`${apiUrl}/api/setting`,
                {
                    headers: {
                        Authorization: "Bearer " + sessionToken
                    }
                })


            setNavigation1(response?.data?.data?.navigation1)
            setNavigation2(response?.data?.data?.navigation2)
            setAudienceSize(`${response?.data?.data?.audience_size}`);
            setLoading(false)

        } catch (error) {
            console.log(error,'errror');
            setToastMsg(error?.response?.data?.message)
            setErrorToast(true)

        }

    };

    const settingSave = async () => {

        setLoading(true)
        const sessionToken = await getSessionToken(appBridge);
        try {

            let data = {
                navigation1: navigation1,
                navigation2: navigation2,
                audience_size: audienceSize,

            }

            const response = await axios.post(`${apiUrl}/api/setting-save`,data,
                {
                    headers: {
                        Authorization: "Bearer " + sessionToken
                    }
                })
            setToastMsg(response?.data?.message)
            setSucessToast(true)
            setLoading(false)


        } catch (error) {
            console.log(error,'error')
            setToastMsg(error?.response?.data?.message)
            setErrorToast(true)

        }

    };


    useEffect(() => {
        getData()
    },[]);
    // ------------------------Toasts Code start here------------------
    const toggleErrorMsgActive = useCallback(() => setErrorToast((errorToast) => !errorToast), []);
    const toggleSuccessMsgActive = useCallback(() => setSucessToast((sucessToast) => !sucessToast), []);

    const toastErrorMsg = errorToast ? (
        <Toast content={toastMsg} error onDismiss={toggleErrorMsgActive} />
    ) : null;

    const toastSuccessMsg = sucessToast ? (
        <Toast content={toastMsg} onDismiss={toggleSuccessMsgActive} />
    ) : null;


    const resourceName = {
        singular: 'Customer',
        plural: 'Customers',
    };


    const [formErrors, setFormErrors] = useState({});
    const [btnLoading, setBtnLoading] = useState(false);


    return (
        <Frame>
        <div className="Customization-Page">
            <Page fullWidth title="Settings"
                  secondaryActions={<Button>Back</Button>}
            >

                {loading ? (
                    <span>
              <Loading />

            </span>
                ) : (
                    <>
                            <Layout>
                                <Layout.Section variant="oneThird">
                                    <Text variant="headingMd" as="h6">
                                        A/B Test Navigation Settings
                                    </Text>
                                    <div className="side_text">
                                    <Text  variant="bodyMd" as="p">
                                    Indicate your Control and Variant Navigation.
                                    </Text>
                                    <Text variant="bodyMd" as="p">
                                       Select your Audience Settings.
                                    </Text>
                                    </div>

                                </Layout.Section>

                                <Layout.Section >
                                    <Card>
                                        <BlockStack gap="300">
                                        <InputField
                                            type="text"
                                            label="Navigation 1"
                                            name="navigation1"
                                            value={navigation1}
                                            onChange={(e) => setNavigation1(e.target.value)}
                                            autoComplete="off"

                                        />

                                            <InputField
                                                marginTop
                                                type="text"
                                                label="Navigation 2"
                                                name="navigation2"
                                                value={navigation2}
                                                onChange={(e) => setNavigation2(e.target.value)}
                                                autoComplete="off"

                                            />
                                            <Select
                                                label="Audience Size"
                                                options={[
                                                    {
                                                        label: "0%",
                                                        value: "0",
                                                    },
                                                    {
                                                        label: "10%",
                                                        value: "10",
                                                    },
                                                    { label: "20%", value: "20" },
                                                    { label: "30%", value: "30" },
                                                    { label: "40%", value: "40" },
                                                    { label: "50%", value: "50" },
                                                    { label: "60%", value: "60" },
                                                    { label: "70%", value: "70" },
                                                    { label: "80%", value: "80" },
                                                    { label: "90%", value: "90" },
                                                    { label: "100%", value: "100" },
                                                ]}
                                                onChange={handleAudienceSizeStatusChange}
                                                value={audienceSize}
                                            />
                                            <div className="Polaris-Product-Actions">
                                                <PageActions
                                                    primaryAction={{
                                                        content: "Save",
                                                        onAction: settingSave,
                                                        loading: btnLoading

                                                    }}
                                                />
                                            </div>
                                        </BlockStack>
                                    </Card>
                                </Layout.Section>
                            </Layout>


                    </>
                )}

            </Page>

            {toastErrorMsg}
            {toastSuccessMsg}
        </div>
        </Frame>
    );

}




