import { RevenutData } from '../types/revenut';
import * as api from '../utils/api';
import * as storage from '../utils/storage';

import { Dispatch, SetStateAction, useCallback } from 'react';
import { Modal, Center, Box, Badge, HStack, Spacer, Button, Flex, Link, Text } from 'native-base';

export function RevenutSettings({
    toggleUserID
    , toggleData
    , toggleSettings
    , showSettings
    , userId }: {
        toggleUserID: Dispatch<SetStateAction<null>>
        , toggleData: Dispatch<SetStateAction<RevenutData>>
        , toggleSettings: Dispatch<SetStateAction<boolean>>
        , showSettings: boolean
        , userId: string | null
    }) {
    const handleLogout = (): void => {
        if (userId) {
            api.getLogoutData(userId)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error(response);
                    }
                })
                .then(data => {
                    toggleData(new RevenutData());
                    toggleUserID(null);
                    toggleSettings(false);
                    storage.removeFromStorage(storage.REVENUT_ACCOUNTID_STRIPE);
                })
        }
    }

    return (
        <Modal isOpen={showSettings} onClose={() => toggleSettings(false)} size={'full'}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Settings</Modal.Header>
                <Modal.Body>
                    <Center>
                        <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg="coolGray.100" p="5">
                            <HStack alignItems="center">
                                <Badge colorScheme="darkBlue" _text={{
                                    color: "white"
                                }} variant="solid">
                                    Open Source
                                </Badge>
                                <Spacer />
                                <Text fontSize={10} color="coolGray.800">
                                    <Button size={'sm'} variant={'outline'} onPress={() => handleLogout()} colorScheme={'secondary'} isDisabled={!userId}>Logout</Button>
                                </Text>
                            </HStack>
                            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                                Revenut v1
                            </Text>
                            <Text mt="2" fontSize="sm" color="coolGray.700">
                                Revenut is a product to help view how much revenue your SaaS is projected to generate by the end of the month by analyzing your charges and subscriptions.
                            </Text>
                            <Flex>
                                <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                                    <Link href="https://github.com/hbcondo/revenut-app" isExternal={true} isUnderlined={false}>View on Github</Link>
                                </Text>
                            </Flex>
                        </Box>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
};