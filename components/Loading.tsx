import { Modal, HStack, Heading, Spinner } from 'native-base';

export function RevenutLoading({ isLoading }: { isLoading: boolean }) {
	return (
		<Modal isOpen={isLoading}>
			<Modal.Content>
				<Modal.Body>
					<HStack space={2} justifyContent="center">
						<Spinner accessibilityLabel="Loading" />
						<Heading color="primary.500" fontSize="md">
							Loading
						</Heading>
					</HStack>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	)
}