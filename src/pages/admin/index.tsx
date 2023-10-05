import React from "react";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

const AdminPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <h1 className={"text-4xl font-bold text-center"}>QR Admin</h1>

    </>
  );
};

export default AdminPage;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
