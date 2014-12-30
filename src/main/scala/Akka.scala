import akka.actor.{Actor, Props, ActorSystem}

case class Message(title: String, content: String){
    override def equals(obj: scala.Any): Boolean = {
        obj match {
            case that: Message => this.title == that.title && this.content == that.content
            case _ => false
        }
    }
}

class SenderActor extends Actor {
    def receive = {
        case value => {
            val receiverActor = context.actorOf(Props[ReceiverActor], name = "receiveractor")
            receiverActor ! Message("test_1", "this is a test message")
            receiverActor ! Message("test_1", "this is a test message")
            receiverActor ! Message("test_2", "this is a test message2")
            receiverActor ! Message("test_1", "this is a test message")
            receiverActor ! Message("test_2", "this is a test message2")
        }
    }
}

object ReceiverActor {
    var bufMessages = List.empty[Message]
}

class ReceiverActor extends Actor {
    def receive = {
        case message: Message if !ReceiverActor.bufMessages.find(_.equals(message)).isDefined => {
            ReceiverActor.bufMessages = ReceiverActor.bufMessages :+ message
            println(message.title + ": " + message.content)
        }
        case _ => {
            println("<message exist>")
        }
    }
}

object Akka extends App {
    val senderActor = ActorSystem("SenderActor")
    senderActor.actorOf(Props[SenderActor], name = "senderactor") ! "run"
}