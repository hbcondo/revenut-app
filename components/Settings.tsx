import { Modal, Center, Box, Badge, HStack, Spacer, Button, Flex, Link, Text } from 'native-base';

export function RevenutSettings({
    toggleSettings
    , showSettings
    , userId }: {
        toggleSettings: React.Dispatch<React.SetStateAction<boolean>>
        , showSettings: boolean
        , userId: string | null
    }) {
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
                                    <Link href="https://github.com/hbcondo/revenut-web" isExternal={true} isUnderlined={false}>View on Github</Link>
                                </Text>
                            </Flex>
                        </Box>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
};

const handleLogout = () => {
    console.log("handleLogout");
    // TODO: implement logout
}