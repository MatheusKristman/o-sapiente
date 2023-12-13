import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Server } from "socket.io";

import useActiveStore from "./useActiveStore";
import { Socket } from "socket.io";

const useActiveUser = () => {
  const { add, remove } = useActiveStore();
  const [activeChannel, setActiveChannel] = useState<Socket | null>(null);

  //TODO arrumar a logica para conectar e ver status online no chat
  useEffect(() => {
    let socket = activeChannel;

    if (!socket) {
      // socket = io(`${process.env.NEXT_PUBLIC_SITE_URL!}/api/socket/io`);

      // socket?.emit("join", { room: `request:${requestId}` });

      setActiveChannel(socket);
    }

    socket!.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO");
    });

    socket!.on("member:joined", (member) => {
      add(member.id);
    });

    socket!.on("member:left", (member) => {
      remove(member.id);
    });

    return () => {
      if (socket) {
        // socket.emit("leave", { room: `request:${requestId}` });
        socket.disconnect();
        setActiveChannel(null);
      }
    };
  }, [activeChannel, add, remove]);
};

export default useActiveUser;
