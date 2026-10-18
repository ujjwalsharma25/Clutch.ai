import AuthForm from "@/components/AuthForm";
export default function Page({ searchParams }: { searchParams: { token?: string } }) { return <AuthForm mode="reset" token={searchParams.token} />; }
