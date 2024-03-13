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
    Pagination,
    Link,
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


import { ProductsCard } from "../components";
import {useNavigate,useLocation} from "react-router-dom";

export default function HomePage() {
    const orders = [
        {
            id: '1020',
            order: '#1020',
            date: 'Jul 20 at 4:34pm',
            customer: 'Jaydon Stanton',
            total: '$969.44',
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
        {
            id: '1019',
            order: '#1019',
            date: 'Jul 20 at 3:46pm',
            customer: 'Ruben Westerfelt',
            total: '$701.19',
            paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
        {
            id: '1018',
            order: '#1018',
            date: 'Jul 20 at 3.44pm',
            customer: 'Leo Carder',
            total: '$798.24',
            paymentStatus: <Badge progress="complete">Paid</Badge>,
            fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
        },
    ];
    const resourceName = {
        singular: 'order',
        plural: 'orders',
    };

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
        useIndexResourceState(orders);

    const rowMarkup = orders.map(
        (
            {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
            index,
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {order}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{date}</IndexTable.Cell>
                <IndexTable.Cell>{customer}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" alignment="end" numeric>
                        {total}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
                <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    return (
        <LegacyCard>
            <IndexTable
                resourceName={resourceName}
                itemCount={orders.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    {title: 'Order'},
                    {title: 'Date'},
                    {title: 'Customer'},
                    {title: 'Total', alignment: 'end'},
                    {title: 'Payment status'},
                    {title: 'Fulfillment status'},
                ]}
            >
                {rowMarkup}
            </IndexTable>
        </LegacyCard>
    );
}




