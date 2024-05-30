// pages/add-child.js
import { useRouter } from 'next/router';

export default function AddChild() {
    const router = useRouter();

    const handleAddChild = () => {
        router.push('/profile');
    };

    return (
        <div>
            <p>You should add a child to start playing.</p>
            <button onClick={handleAddChild}>Add Child</button>
        </div>
    );
}