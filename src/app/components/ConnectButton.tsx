"use client"

//import hooks wagmi
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";

const ConnectButton = () => {

  const { connect, connectors, isLoading, isIdle } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useBalance({
    address
  });

  return (
    <div>
      {!isConnected ? (
        <button
          //conecntando ao conector no array [0], "MagicAuthConnector"
          onClick={() => connect({ connector: connectors[0] })}
          className="bg-[#6452f6] rounded-full mt-4 text-white py-2 px-10"
        >
          {isLoading ? "Loading..." : isIdle ? "Connect" : "Connecting..."}
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-black border-t pt-4 mt-4 border-neutral-600 text-center">
            Connected with {address}
          </p>
          <p className="text-black pt-4">Balance : {data?.formatted}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 rounded-full mt-4 text-white py-2 px-10"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}

export default ConnectButton;