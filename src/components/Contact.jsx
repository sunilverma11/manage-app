import { Heading, Stack, Text } from "@chakra-ui/react"
import { Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'

const Contact = ()=>{

    return(<Stack align="center">
        <Heading>Sunil Kumar Verma</Heading>
        <Text>srksaroya@hotmail.com</Text>
        <Text>+91-8824778494</Text>
        <Link href='https://www.linkedin.com/in/sunilrajverma/' isExternal>
            LinkedIn <ExternalLinkIcon mx='2px' />
        </Link>
        <Link href='https://github.com/sunilverma11' isExternal>
            Github <ExternalLinkIcon mx='2px' />
        </Link>
    </Stack>
        
    )
}
export default Contact;